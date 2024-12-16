const dms = {
  width: 1000,
  height: 1000,
  margin: {
    top: 50,
    right: 100,
    bottom: 50,
    left: 100,
  },
};
(dms.outerRadius = dms.width / 2),
  (dms.innerRadius = dms.outerRadius - 170),
  (dms.contentWidth = dms.width - dms.margin.left - dms.margin.right);
dms.contentHeight = dms.height - dms.margin.top - dms.margin.bottom;

function parseNewick(a) {
  for (
    var e = [], r = {}, s = a.split(/\s*(;|\(|\)|,|:)\s*/), t = 0;
    t < s.length;
    t++
  ) {
    var n = s[t];
    switch (n) {
      case "(":
        var c = {};
        (r.branchset = [c]), e.push(r), (r = c);
        break;
      case ",":
        var c = {};
        e[e.length - 1].branchset.push(c), (r = c);
        break;
      case ")":
        r = e.pop();
        break;
      case ":":
        break;
      default:
        var h = s[t - 1];
        ")" == h || "(" == h || "," == h
          ? (r.name = n)
          : ":" == h && (r.length = parseFloat(n));
    }
  }
  return r;
}

legend = (svg) => {
  const g = svg
    .selectAll("g")
    .data(color.domain())
    .join("g")
    .attr(
      "transform",
      (d, i) => `translate(${-dms.outerRadius},${-dms.outerRadius + i * 20})`
    );

  g.append("rect").attr("width", 18).attr("height", 18).attr("fill", color);

  g.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", "0.35em")
    .text((d) => d);
};

function linkStep(startAngle, startRadius, endAngle, endRadius) {
  const c0 = Math.cos((startAngle = ((startAngle - 90) / 180) * Math.PI));
  const s0 = Math.sin(startAngle);
  const c1 = Math.cos((endAngle = ((endAngle - 90) / 180) * Math.PI));
  const s1 = Math.sin(endAngle);
  return (
    "M" +
    startRadius * c0 +
    "," +
    startRadius * s0 +
    (endAngle === startAngle
      ? ""
      : "A" +
        startRadius +
        "," +
        startRadius +
        " 0 0 " +
        (endAngle > startAngle ? 1 : 0) +
        " " +
        startRadius * c1 +
        "," +
        startRadius * s1) +
    "L" +
    endRadius * c1 +
    "," +
    endRadius * s1
  );
}

function linkExtensionConstant(d) {
  return linkStep(d.target.x, d.target.y, d.target.x, dms.innerRadius);
}

function linkExtensionVariable(d) {
  return linkStep(d.target.x, d.target.radius, d.target.x, dms.innerRadius);
}

function linkConstant(d) {
  return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
}

function linkVariable(d) {
  return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius);
}

function setColor(d) {
  var name = d.data.name;
  d.color =
    color.domain().indexOf(name) >= 0
      ? color(name)
      : d.parent
      ? d.parent.color
      : null;
  if (d.children) d.children.forEach(setColor);
}

function setRadius(d, y0, k) {
  d.radius = (y0 += d.data.length) * k;
  if (d.children) d.children.forEach((d) => setRadius(d, y0, k));
}

function maxLength(d) {
  return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
}

color = d3
  .scaleOrdinal()
  .domain(["Bacteria", "Eukaryota", "Archaea"])
  .range(d3.schemeCategory10);

cluster = d3
  .cluster()
  .size([360, dms.innerRadius])
  .separation((a, b) => 1);

function chart(data) {
  const root = d3
    .hierarchy(data, (d) => d.branchset)
    .sum((d) => (d.branchset ? 0 : 1))
    .sort(
      (a, b) => a.value - b.value || d3.ascending(a.data.length, b.data.length)
    );

  cluster(root);
  setRadius(root, (root.data.length = 0), dms.innerRadius / maxLength(root));
  setColor(root);

  const svg = d3
    .create("svg")
    .attr("viewBox", [-dms.outerRadius, -dms.outerRadius, dms.width, dms.width])
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("width", dms.width)
    .attr("height", dms.height);

  svg.append("g").call(legend);

  svg.append("style").text(`

.link--active {
  stroke: #000 !important;
  stroke-width: 1.5px;
}

.link-extension--active {
  stroke-opacity: .6;
}

.label--active {
  font-weight: bold;
}

`);

  const linkExtension = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-opacity", 0.25)
    .selectAll("path")
    .data(root.links().filter((d) => !d.target.children))
    .join("path")
    .each(function (d) {
      d.target.linkExtensionNode = this;
    })
    .attr("d", linkExtensionVariable);  // 设置为显示枝长

  const link = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .selectAll("path")
    .data(root.links())
    .join("path")
    .each(function (d) {
      d.target.linkNode = this;
    })
    .attr("d", linkVariable) // 设置为显示枝长
    .attr("stroke", (d) => d.target.color)


  svg
    .append("g")
    .selectAll("text")
    .data(root.leaves())
    .join("text")
    .attr("dy", ".31em")
    .attr(
      "transform",
      (d) =>
        `rotate(${d.x - 90}) translate(${dms.innerRadius + 4},0)${
          d.x < 180 ? "" : " rotate(180)"
        }`
    )
    .attr("text-anchor", (d) => (d.x < 180 ? "start" : "end"))
    .text((d) => d.data.name.replace(/_/g, " "))
    .on("mouseover", mouseovered(true))
    .on("mouseout", mouseovered(false));

  function update(checked = true) {
    const t = d3.transition().duration(750);
    linkExtension
      .transition(t)
      .attr("d", checked ? linkExtensionVariable : linkExtensionConstant);// 如果checked为true，则设置为linkExtensionVariable显示枝长，否则不显示
    link.transition(t).attr("d", checked ? linkVariable : linkConstant); // 如果checked为true，则设置为linkVariable显示枝长，否则不显示
  }

  function mouseovered(active) {
    return function (event, d) {
      d3.select(this).classed("label--active", active);
      d3.select(d.linkExtensionNode)
        .classed("link-extension--active", active)
        .raise();
      do d3.select(d.linkNode).classed("link--active", active).raise();
      while ((d = d.parent));
    };
  }

  return Object.assign(svg.node(), { update });
}

fetch("static/tree/life.txt")
  .then((response) => response.text())
  .then((text) => {
    const data = parseNewick(text);
    const plot = chart(data);
    const box = d3.select("#box-div").node().append(plot);
  });

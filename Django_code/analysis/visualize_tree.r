# 获取命令行参数
args <- commandArgs(trailingOnly = TRUE)

# 检查参数数量
if (length(args) != 2) {
  cat("请提供两个参数\n")
  quit(status = 1)
}

# 解析参数
input_file <- args[1]
output_file <- args[2]
print(input_file)
# 运行ggtree
library("treeio")
library("ggtree")
tree <- read.tree(input_file)
p <- ggplot(tree, aes(x, y),size=1) + geom_tree() + theme_tree() + geom_tiplab(align=T, as_ylab=T)

# 输出结果
ggsave(output_file, plot = p, device = "svg", width=15)
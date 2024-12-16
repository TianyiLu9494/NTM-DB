from Bio import AlignIO
import re

def format_MSA_html(file_path):
    with open(file_path) as handle:
        alignment = AlignIO.read(handle, "clustal")
    html_text = '<table class="MSA" ><tbody>'
    for record in alignment:
        html_text += "<tr><td>"+record.id+"</td><td>"+str(record.seq)+"</td></tr>"
    html_text += "</tbody></table>"
    return html_text

def set_style(letter):
    if letter == "a":
        return "background-color: #ff4c29; color: white;"
    elif letter == "t":
        return "background-color: #2d4263; color: white;"
    elif letter == "c":
        return "background-color: #29c7ac; color: white;"
    elif letter == "g":
        return "background-color: #ecb365; color: white;"
    elif letter == "n":
        return "background-color: #888888; color: white;"
    else:
        return "color: #333333;"

def format_MSA_html2(file_path):
    html_text = '<table class="MSA"><tbody>'
    with open(file_path,'r') as handle:
        for line in handle.readlines()[3:]:
            if line.isspace():
                html_text += '</table></tbody><br><table class="MSA"><tbody>'
            else:
                line = line.strip()
                rec_id,sequence = re.split(r'\s+', line)
                sequence = ''.join([f'<td style="{set_style(c)}">{c}</td>' for c in sequence])
                html_text += f"<tr><th>{rec_id}</th>{sequence}</tr>"
    if html_text.endswith('<table class="MSA"><tbody>'):
        html_text = html_text[:-len('<table class="MSA"><tbody>')]
    ## Save html text for debugging
    # with open( file_path.replace("aln","html"),'w') as out_handle:
    #     out_handle.write(html_text)
    return html_text
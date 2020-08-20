/// 这里暂时使用Hard Code的方式, 最终会以json文件的形式保存，并且提供入口使其可以替换该文件，实现自定义功能。

export let snippetMap = {
    'text': [
        "{",
        "\t\"type\": \"XText\",",
        "\t\"conf\": {",
        "\t\t\"textAlign\": \"[left,right,center,justify,start,end]\",",
        "\t\t\"textDirection\": \"[ltr,rtl]\",",
        "\t\t\"locale\": {},",
        "\t\t\"softWrap\": [true,false],",
        "\t\t\"overflow\": \"[clip,fade,ellipsis,visible]\",",
        "\t\t\"textScaleFactor\": 1.0,",
        "\t\t\"maxLines\": 1,",
        "\t\t\"semanticsLabel\": \"\",",
        "\t\t\"textWidthBasis\": \"[parent,longestLine]\",",
        "\t\t\"textHeightBehavior\": {},",
        "\t\t\"style\": {",
        "\t\t\t\"color\": \"${color}\",",
        "\t\t\t\"fontSize\": ${font-size},",
        "\t\t\t\"fontWeight\": \"${font-weight}\",",
        "\t\t\t\"fontFamily\": \"${font-family}\",",
        "\t\t\t\"height\": ${15:1.2}",
        "\t\t},",
        "\t\t\"strutStyle\": {},",
        "\t\t\"bindDataKey\": \"\"",
        "\t},",
        "\t\"text\": \"${text}\"",
        "}"
    ],
};

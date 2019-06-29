interface GetStyleByOptions {
    (options: { [key: string]: any }, useFront: boolean): string
}

const getStyleByOptions: GetStyleByOptions = (options, useFront) => {
    let styleArr: string[] = []
    for (let k in options) {
        if (!useFront && ~["pointer-events", "z-index"].indexOf(k)) {
            continue
        }

        if (Object.prototype.hasOwnProperty.call(options, k)) {
            styleArr.push(`${k}:${options[k]}`)
        }
    }
    return styleArr.join(";") + ";"
}

export default (arr: Array<string>, style = {}, styles = [], useFront = true) => {
    let [img0, img1, img2] =
        arr && arr.length
            ? [encodeURI(arr[0] || "none"), encodeURI(arr[1] || "none"), encodeURI(arr[2] || "none")]
            : ["", "", ""]

    let defStyle = getStyleByOptions(style, useFront)
    let [style0, style1, style2] = [
        defStyle + getStyleByOptions(styles[0], useFront),
        defStyle + getStyleByOptions(styles[1], useFront),
        defStyle + getStyleByOptions(styles[2], useFront)
    ]

    let frontContent = useFront ? "::after" : "::before"

    let content = `
/*css-background-start*/
/*background.ver*/
[id="workbench.parts.editor"] .split-view-view:nth-child(1) .editor-container .overflow-guard>.monaco-scrollable-element${frontContent}{background-image: url('${img0}');${style0}}
[id="workbench.parts.editor"] .split-view-view:nth-child(2) .editor-container .overflow-guard>.monaco-scrollable-element${frontContent}{background-image: url('${img1}');${style1}}
[id="workbench.parts.editor"] .split-view-view:nth-child(3) .editor-container .overflow-guard>.monaco-scrollable-element${frontContent}{background-image: url('${img2}');${style2}}
[id="workbench.parts.editor"] .split-view-view .editor-container .overflow-guard>.monaco-scrollable-element>.monaco-editor-background{background: none;}
/*css-background-end*/
`

    return content
}

import * as path from "path"
import { helper } from "../helper"

const getRequireFilename = () => {
    if (require && require.main) {
        return require.main.filename
    } else {
        helper.showInfo("base directory is not found")
        return ""
    }
}

export const baseDirPath = path.dirname(getRequireFilename())
export const cssFilePath = path.join(baseDirPath, "vs", "workbench", "workbench.main.css")
export const electronDirPath = path.join(baseDirPath, "vs", "workbench", "electron-browser", "bootstrap")

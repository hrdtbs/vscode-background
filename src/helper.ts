import * as vscode from "vscode"

export const helper = {
    showInfo(content: string): Thenable<string | undefined> {
        return vscode.window.showInformationMessage(content)
    },
    async showInfoRestart(content: string): Promise<void | undefined> {
        const item = await vscode.window.showInformationMessage(content, {
            title: "Restart vscode"
        })
        if (!item) return
        vscode.commands.executeCommand("workbench.action.reloadWindow")
    }
}

import * as fs from "fs";
import * as path from "path";

import * as vscode from "vscode";

import { cssFilePath } from "./utils/vscodePath";
import { helper } from "./helper";
import getCss from "./utils/getCss";

enum FileType {
  empty,
  isNew
}

class App {
  private config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(
    "background"
  );
  private getCssContent(): string {
    return fs.readFileSync(cssFilePath, "utf-8");
  }
  private saveCssContent(content: string): void {
    fs.writeFileSync(cssFilePath, content, "utf-8");
  }
  private initialize(): void {
    const firstload = this.checkFirstload();
    const fileType = this.getFileType();
    if (firstload) {
      this.install(true);
    }
    if (fileType == FileType.empty) {
      this.install(true);
    }
  }
  private checkFirstload(): boolean {
    const configPath = path.join(__dirname, "../assets/config.json");
    let info: { firstload: boolean } = JSON.parse(
      fs.readFileSync(configPath, "utf-8")
    );
    if (info.firstload) {
      helper.showInfo(
        "Welcome to use background! U can config it in settings.json."
      );
      info.firstload = false;
      fs.writeFileSync(configPath, JSON.stringify(info, null, "    "), "utf-8");
      return true;
    }
    return false;
  }
  private getFileType(): FileType {
    let cssContent = this.getCssContent();
    let isInstalled = cssContent.includes(`background.ver`);
    if (isInstalled === false) {
      return FileType.empty;
    }
    return FileType.isNew;
  }
  private install(refresh?: boolean): void {
    let lastConfig = this.config;
    let config = vscode.workspace.getConfiguration("background");

    if (!refresh && JSON.stringify(lastConfig) === JSON.stringify(config)) {
      return;
    }

    if (!lastConfig.enabled && !config.enabled) {
      return;
    }
    this.config = config;
    if (!config.enabled) {
      this.uninstall();
      helper.showInfoRestart(
        "Background has been uninstalled! Please restart."
      );
      return;
    }
    let arr = config.customImages;
    let content = getCss(
      arr,
      config.style,
      config.styles,
      config.useFront
    ).replace(/\s*$/, "");
    let cssContent = this.getCssContent();
    cssContent = this.clearCssContent(cssContent);
    cssContent += content;
    this.saveCssContent(cssContent);
    helper.showInfoRestart(
      `Background has been changed! Please restart.${JSON.stringify(
        cssContent
      )}`
    );
  }
  private uninstall(): boolean {
    try {
      let content = this.getCssContent();
      content = this.clearCssContent(content);
      this.saveCssContent(content);
      return true;
    } catch (ex) {
      return false;
    }
  }
  private clearCssContent(content: string): string {
    content = content.replace(
      /\/\*css-background-start\*\/[\s\S]*?\/\*css-background-end\*\//g,
      ""
    );
    content = content.replace(/\s*$/, "");
    return content;
  }
  public watch(): vscode.Disposable {
    this.initialize();
    return vscode.workspace.onDidChangeConfiguration(() => this.install());
  }
}

export default new App();

"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { helper } from "./helper";
import app from "./app";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = (context: vscode.ExtensionContext) => {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "background" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.background.info",
    () => {
      helper.showInfo(
        "You can config your background in settings.json. Enjoy it!"
      );
    }
  );

  context.subscriptions.push(disposable);

  context.subscriptions.push(app.watch());
};

// this method is called when your extension is deactivated
export const deactivate = () => {
  // vscode.window.showInformationMessage('deactivated!');
};

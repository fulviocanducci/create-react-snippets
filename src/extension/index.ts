'use strict';

import * as vscode from 'vscode';

import {
  useRegisterCommandSnippetAsync,
  useRegisterCommandSnippetHookAsync,
  useRegisterCommandSnippetImportsAsync,
  useRegisterCommandSnippetExportsAsync,
} from './snippet';

export function activate(context: vscode.ExtensionContext) {
  const disposables = [
    vscode.commands.registerCommand(
      'canducci.snippetCanducci',
      async () => await useRegisterCommandSnippetAsync(vscode)
    ),
    vscode.commands.registerCommand(
      'canducci.snippetCanducciCreateHook',
      async () => await useRegisterCommandSnippetHookAsync(vscode)
    ),
    vscode.commands.registerCommand(
      'canducci.snippetCanducciImports',
      async () => await useRegisterCommandSnippetImportsAsync(vscode)
    ),
    vscode.commands.registerCommand(
      'canducci.snippetCanducciExports',
      async () => await useRegisterCommandSnippetExportsAsync(vscode)
    ),
  ];
  context.subscriptions.push(...disposables);
}

export function deactivate() {}

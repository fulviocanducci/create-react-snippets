import { Snippet } from './types';
import { arrayToString } from './utils';

/*
/ Require Snippets Json
*/
const jsonSnippets = require('../../snippets/snippets.json');
const jsonHooks = require('../../snippets/hooks.json');
const jsonImports = require('../../snippets/imports.json');
const jsonExports = require('../../snippets/defaultExport.json');
const jsonContext = require('../../snippets/context.json');

/*
/ Snippets JSON
*/
const useJsonSnippets = () => Object.entries(jsonSnippets as Array<Snippet>);
const useJsonHooks = () => Object.entries(jsonHooks as Array<Snippet>);
const useJsonImports = () => Object.entries(jsonImports as Array<Snippet>);
const useJsonExports = () => Object.entries(jsonExports as Array<Snippet>);
const useJsonContext = () => Object.entries(jsonContext as Array<Snippet>);

/*
/ Merge All Snippets JSON
*/
const useMergeSnippets = () => [
  ...useJsonSnippets(),
  ...useJsonHooks(),
  ...useJsonImports(),
  ...useJsonExports(),
  ...useJsonContext(),
];

console.log(useMergeSnippets());

/*
/ Create Source Items Values
*/
const useCreateSource = (values: [string, Snippet][]) => {
  let source = values.map(
    ([shortDescription, { prefix, body, description }], index) => {
      const value = typeof prefix === 'string' ? prefix : prefix[0];
      return {
        id: index,
        description: description || shortDescription,
        label: value,
        value,
        body,
      };
    }
  );
  source.sort((a, b) => a.description.localeCompare(b.description));
  return source;
};

/*
/ useSnippets
*/
const useItems = () => useCreateSource(useMergeSnippets());
const useHookItems = () => useCreateSource(useJsonHooks());
const useImportsItems = () => useCreateSource(useJsonImports());
const useExportsItems = () => useCreateSource(useJsonExports());

/*
/ Options
*/
const useOptions = () => ({
  matchOnDescription: true,
  matchOnDetail: true,
  placeHolder: 'Canducci React Search Snippet',
});

const useBodyDefault = () => ({
  body: '',
});

/*
/ useSnippet Items [string , Snippet]
*/
const useSnippetAsync = async (vscode: any, items: any): Promise<any> => {
  return (
    (await vscode.window.showQuickPick(items, useOptions())) || useBodyDefault()
  );
};
/*
/ useSnippet Default
*/
const useBody = (body: string): string => {
  return typeof body === 'string' ? body : arrayToString(body);
};

/*
/ Insert Snippet
*/
const insertSnippetAsync = async (vscode: any, items: any): Promise<void> => {
  const snippet = await useSnippetAsync(vscode, items);
  const body = useBody(snippet.body);
  const activeTextEditor = vscode.window.activeTextEditor;
  activeTextEditor &&
    activeTextEditor.insertSnippet(new vscode.SnippetString(body));
};

/*
/ Register Command
*/
const useRegisterCommandSnippetAsync = async (vscode: any): Promise<void> => {
  insertSnippetAsync(vscode, useItems());
};

const useRegisterCommandSnippetHookAsync = async (
  vscode: any
): Promise<void> => {
  insertSnippetAsync(vscode, useHookItems());
};

const useRegisterCommandSnippetImportsAsync = async (
  vscode: any
): Promise<void> => {
  insertSnippetAsync(vscode, useImportsItems());
};

const useRegisterCommandSnippetExportsAsync = async (
  vscode: any
): Promise<void> => {
  insertSnippetAsync(vscode, useExportsItems());
};

export {
  useRegisterCommandSnippetAsync,
  useRegisterCommandSnippetHookAsync,
  useRegisterCommandSnippetImportsAsync,
  useRegisterCommandSnippetExportsAsync,
};

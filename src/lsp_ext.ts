import * as lc from "vscode-languageclient";

interface GetBuiltinFileContentParams {
    builtin_path: string;
}

export const getBuiltinFileContent = new lc.RequestType<
    GetBuiltinFileContentParams,
    string,
    void
>("par-lang/getBuiltinFileContent");

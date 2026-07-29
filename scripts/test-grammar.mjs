#!/usr/bin/env node

import assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import * as yaml from "js-yaml";

const grammar = yaml.load(
    await fs.readFile(
        new URL("../syntaxes/par.tmLanguage.yaml", import.meta.url),
        "utf8",
    ),
);

const patterns = grammar.repository["type-parameter-constraints"].patterns;

const constraintsIn = (source) => {
    const constraints = [];

    for (const pattern of patterns) {
        const constraintCapture = Object.entries(pattern.captures).find(
            ([, capture]) =>
                capture.name === "storage.type.constraint.par",
        )?.[0];
        assert.ok(constraintCapture, "constraint pattern has a scoped capture");

        for (const match of source.matchAll(new RegExp(pattern.match, "g"))) {
            constraints.push(match[Number(constraintCapture)]);
        }
    }

    return constraints;
};

assert.deepEqual(constraintsIn("dec ToString : [<a: data> a] String"), [
    "data",
]);
assert.deepEqual(
    constraintsIn(
        "dec Sum : [<e, a: number> Stream<e, a>] Try<e, a>",
    ),
    ["number"],
);
assert.deepEqual(constraintsIn("def F = [<e: drop, a: share> value] value"), [
    "drop",
    "share",
]);
assert.deepEqual(constraintsIn("def F = [type a: signed, value] value"), [
    "signed",
]);
assert.deepEqual(constraintsIn("let f: box [a] a = box [a] a"), []);

console.log("Grammar tests passed.");

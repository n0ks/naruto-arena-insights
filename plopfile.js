module.exports = function(plop) {
  // create your generators here
  // controller generator
  plop.setGenerator("component", {
    description: "Make new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name please"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
        templateFile: "src/templates/component.hbs"
      },
      {
        type: "add",
        path: "src/components/{{name}}/index.ts",
        templateFile: "src/templates/index.hbs"
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.styles.ts",
        templateFile: "src/templates/styles.hbs"
      },
      {
        type: "append",
        path: "src/components/index.ts",
        pattern: /(---plop)/gi,
        template: "export * from './{{pascalCase name}}';"
      }
    ]
  });
  plop.setGenerator("screen", {
    description: "Make new screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "screen name please"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/screens/{{name}}/{{name}}.tsx",
        templateFile: "src/templates/screens.hbs"
      },
      {
        type: "add",
        path: "src/screens/{{name}}/index.ts",
        templateFile: "src/templates/index.hbs"
      },
      {
        type: "add",
        path: "src/screens/{{name}}/{{name}}.styles.ts",
        templateFile: "src/templates/styles.hbs"
      },
      {
        type: "append",
        path: "src/screens/index.ts",
        pattern: /(---plop)/gi,
        template: "export * from './{{pascalCase name}}';"
      }
    ]
  });
};

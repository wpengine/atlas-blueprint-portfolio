export class ProjectTemplatePlugin {
  constructor() {}

  apply(hooks) {
    hooks.addFilter(
      'possibleTemplatesList',
      'ProjectTemplate',
      (templates, data) => {
        if (data?.seedNode?.__typename === 'Project') {
          return Array.from(new Set(['project', ...templates]));
        }
        return templates;
      }
    );
  }
}

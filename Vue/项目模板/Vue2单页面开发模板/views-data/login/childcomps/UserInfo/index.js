export default {
  template: `
<div>
  <p>{{name}}</p>
  <span><slot></slot></span>
</div>
`,
  data() {
    return {
      name: '冷弋白',
    };
  },
};

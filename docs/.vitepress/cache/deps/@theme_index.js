// node_modules/vitepress/dist/client/theme-default/index.js
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/fonts.css";

// node_modules/vitepress/dist/client/theme-default/without-fonts.js
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/vars.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/base.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/utils.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css";
import VPBadge from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue";
import Layout from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/Layout.vue";
import { default as default2 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue";
import { default as default3 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue";
import { default as default4 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue";
import { default as default5 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue";
import { default as default6 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue";
import { default as default7 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue";
import { default as default8 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue";
import { default as default9 } from "G:/company-project/myDocs/node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue";
var theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", VPBadge);
  }
};
var without_fonts_default = theme;
export {
  default5 as VPDocAsideSponsors,
  default3 as VPHomeFeatures,
  default2 as VPHomeHero,
  default4 as VPHomeSponsors,
  default9 as VPTeamMembers,
  default6 as VPTeamPage,
  default8 as VPTeamPageSection,
  default7 as VPTeamPageTitle,
  without_fonts_default as default
};
//# sourceMappingURL=@theme_index.js.map

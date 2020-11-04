const Page = require('puppeteer/lib/Page');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
// Page.prototype.login = async () => {
//   const user = await userFactory();

//   const { session, sig } = sessionFactory(user);

//   await this.setCookie({ name: 'session', value: session });
//   await this.setCookie({ name: 'session.sig', value: sig });

//   await this.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

//   return this;
// };

class CustomPage {
  static build() {
    const page = new Page();
    const customPage = new CustomPage(page);

    const superPage = new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || page[property];
      },
    });

    return superPage;
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();

    const { session, sig } = sessionFactory(user);

    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: sig });

    await this.page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
  }
}

module.exports = superPage;

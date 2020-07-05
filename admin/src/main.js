// import Vue from 'vue';
import App from './App.vue';
import router from './router';
// -------------------------------------
// import {
//   Dialog,
//   Autocomplete,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Input,
//   Select,
//   Option,
//   Button,
//   Table,
//   TableColumn,
//   Form,
//   FormItem,
//   Slider,
//   Icon,
//   Row,
//   Col,
//   Upload,
//   Card,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Image,
//   Loading,
//   MessageBox,
//   Message,
//   Pagination
// } from 'element-ui';

// Vue.use(Dialog);
// Vue.use(Autocomplete);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// Vue.use(Input);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Button);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Slider);
// Vue.use(Icon);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Upload);
// Vue.use(Card);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Image);
// Vue.use(Pagination);

// Vue.use(Loading.directive);

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$message = Message;
// -----------------------------------------
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.less'
import Filter from './utils/filters';
import Global from './utils/global';
import store from './store/index.js';
import Http from './api/api'
import mixins from '@/mixin'


Vue.config.productionTip = false

Vue.mixin(mixins)
Vue.use(Global)
Vue.use(Filter)

Vue.prototype.moment = moment
Vue.prototype.Http = Http



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
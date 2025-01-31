"use strict";
Vue.component("cjmd-icon", {
	props: {
		iconName: {
			type: String,
			default: ""
		},
		size: {
			type: Number,
			default: 24
		},
		label: {
			type: String,
			default: ""
		}
	},
	data: function() {
		return {
			systemIcons: {
				add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
				assignment_ind: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z",
				check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
				close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
				email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
				open_in_new: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z",
				google_plus: "M23 11h-2V9h-2v2h-2v2h2v2h2v-2h2zM8 11v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S5.61 7.58 8 7.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C11.47 5.69 9.89 5 8 5c-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H8z",
				send: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
			}
		}
	},
	template: '<svg xmlns="http://www.w3.org/2000/svg" :height="size" :width="size" viewBox="0 0 24 24" role="presentation">\n              <title v-if="label">{{ label }}</title>\n              <path :d="systemIcons[iconName]"></path>\n            </svg>'
}), Vue.component("cjmd-fab", {
	props: {
		iconName: {
			type: String,
			default: "add"
		},
		fixed: {
			type: Boolean,
			default: !1
		},
		backgroundColor: {
			type: String,
			default: "#182229"
		}
	},
	template: '<div @click="$emit(\'click\', $event)" class="cjmd-fab" :class="{\'cjmd-fab--fixed\': fixed}" :style="{ backgroundColor: backgroundColor }">\n              <cjmd-icon :icon-name="iconName"></cjmd-icon>\n            </div>'
}), Vue.component("cjmd-button", {
	props: {
		raised: {
			type: Boolean,
			default: !1
		}
	},
	template: '<button @click="$emit(\'click\', $event)" class="cjmd-button" :class="{\'cjmd-button--raised\': raised}"><slot></slot></button>'
}), Vue.component("cjmd-iconbutton", {
	props: {
		iconName: {
			type: String,
			required: !0
		},
		link: {
			type: String
		},
		dark: {
			type: Boolean,
			default: !1
		}
	},
	template: '<component @click="$emit(\'click\', $event)" :href="link" :is="link ? \'a\' : \'button\'" class="cjmd-iconbutton" :class="{\'cjmd-iconbutton--dark\': dark}">\n              <cjmd-icon :icon-name="iconName"></cjmd-icon>\n            </component>'
}), Vue.component("cjmd-iconcontainer", {
	props: {
		iconName: {
			type: String,
			required: !0
		},
		dark: {
			type: Boolean,
			default: !1
		}
	},
	template: "<div :class=\"{'cjmd-iconcontainer': true, 'cjmd-iconcontainer--dark': dark}\">\n              <cjmd-icon :icon-name=\"iconName\"></cjmd-icon>\n            </div>"
}), Vue.component("cjmd-textfield", {
	data: function() {
		return {
			inputId: (Date.now() + Math.random()).toString(36).replace(".", "_"),
			inputValue: this.initialValue
		}
	},
	props: {
		initialValue: {
			type: String
		},
		label: {
			type: String
		},
		floatingLabel: {
			type: Boolean,
			default: !1
		},
		multiLine: {
			type: Boolean,
			default: !1
		}
	},
	methods: {
		updateText: function(e) {
			var t = e.target;
			this.multiLine && (t.rows = 1, t.rows = Math.floor(t.scrollHeight / 20)), this.inputValue = t.value, this.$emit(
				"input", this.inputValue)
		}
	},
	template: '<div class="cjmd-textfield" :class="{\'cjmd-textfield--floating-label\': floatingLabel}">\n              <component :is="multiLine ? \'textarea\' : \'input\'" :rows="multiLine ? \'1\' : null" class="cjmd-textfield__input" :class="{\'cjmd-textfield__input-filled\': inputValue}" :id="inputId" @input="updateText"></component>\n              <label class="cjmd-textfield__label" :for="inputId">{{ label }}</label>\n            </div>'
});

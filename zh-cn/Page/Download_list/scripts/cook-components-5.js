"use strict";
Vue.component("cook-header", {
	props: {
		compactMode: {
			type: Boolean,
			default: !1
		}
	},
	template: '<header :class="{\'cook-header\': true, \'cook-header--compact\': compactMode}">\n              <h1 class="cook-header__compactlogo">ArisLauncher</h1>\n              <h2 class="cook-header__subtitle">极客范安卓桌面</h2>\n              <div class="cook-header__actions"><slot></slot></div>\n            </header>'
}), Vue.component("cook-dialog", {
	props: {
		show: {
			type: Boolean
		},
		iconName: {
			type: String,
			required: !0
		},
		label: {
			type: String,
			required: !0
		}
	},
	methods: {
		close: function() {
			this.$emit("close")
		}
	},
	template: '<div class="cook-dialogwrapper" @click="close" v-show="show">\n              <div class="cook-dialog" @click.stop>\n                <div class="cook-dialog__header">\n                  <cjmd-iconcontainer class="cook-dialog__headericon" :icon-name="iconName"></cjmd-iconcontainer>\n                  <h2 class="cook-dialog__title">{{ label }}</h2>\n                  <cjmd-iconbutton icon-name="close" dark @click="close"></cjmd-iconbutton>\n                </div>\n                <div class="cook-dialog__content">\n                  <slot></slot>\n                </div>\n              </div>\n            </div>'
}), Vue.component("cook-aboutdialog", {
	props: {
		show: {
			type: Boolean
		}
	},
	methods: {
		close: function() {
			this.$emit("close")
		}
	},
	template: '<cook-dialog icon-name="assignment_ind" label="About" :show="show" @close="close">\n              <h4 class="cook-dialog__subtitle">ArisLauncher</h4>\n              <img src="https://i.loli.net/2019/11/30/qDV87C9Rym4gaAf.png" width="275" height="275">\n              <p>极客范的安卓桌面<br>The Other Android Launcher</p>\n              <p>Instant<br>Find apps/contacts/shortcuts in terminal</p> <p>本站模板来自<a href=https://cookicons.co/ target=_blank>@Cookicons</a></p>\n            </cook-dialog>'
}), Vue.component("cook-contactdialog", {
	data: function() {
		return {
			dialogData: {
				name: "",
				email: "",
				message: "",
				heardfrom: "",
				error: "",
				inProgress: !1
			}
		}
	},
	props: {
		show: {
			type: Boolean
		}
	},
	methods: {
		close: function() {
			this.$emit("close")
		},
		submit: function() {
			var o = this.dialogData;
			if (o.name)
				if (o.email) {
					if (
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						.test(o.email))
						if (o.message) {
							o.inProgress = !0, o.error = "";
							var e = [o.message, "submitted by: " + o.name + " - " + o.email];
							o.heardfrom && e.push("heard about Cookicons: " + o.heardfrom);
							var a = this.close;
							ajax("#", {
								method: "POST",
								fetchAs: "json",
								body: JSON.stringify({
									name: o.name,
									email: o.email,
									subject: "Cookicons message",
									body: e.join("\r\n\r\n")
								})
							}).then(function(e) {
								return e && e.success
							}, function() {
								return !1
							}).then(function(e) {
								o.inProgress = !1, e ? (o.done = !0, setTimeout(function() {
									a()
								}, 1500)) : o.error = "Uh oh, I don't know what happened"
							})
						} else o.error = "Whoops, no message";
					else o.error = "Hm, can't understand that email"
				} else o.error = "Whoops, no email";
			else o.error = "Whoops, no name"
		}
	},
	template: '<cook-dialog icon-name="email" label="联系我们" :show="show" @close="close"> <p>邮箱: kf@arislauncher.com</p> <p>微博@ <a href=https://weibo.com/arislauncher target=_blank>Aris-终端桌面</a></p>  <p>QQ群1: <a href=https://fgo.pub/qun1 target=_blank>653617792</a></p><p>QQ群2: <a href=https://fgo.pub/qun2 target=_blank>942885582</a></p> <p>抖音: Aris-终端桌面<br>ID: ArisLauncher</p><p>快手: Aris-终端桌面<br>ID: ArisLauncher</p> <a href=https://arislauncher.com target=_blank>访问官网</a> <p> </p> <div class="cook-contactdialog__error">{{ dialogData.error }}</div>\n            </cook-dialog>'
}), Vue.component("cook-appicon", {
	props: {
		iconName: {
			type: String,
			required: !0
		},
		label: {
			type: String,
			required: !0
		},
		link: {
			type: String
		},
		animating: {
			type: Boolean,
			default: !1
		}
	},
	template: '<div class="cook-appicon" :class="{\'cook-appicon--animating\': animating}">\n              <div class="cook-appicon__thumbnail">\n                <img :src="\'images/app-icons/\' + iconName + \'.png\'" :srcset="\'images/app-icons/\' + iconName + \'@2x.png 2x\'" height="192" width="192">\n              </div>\n              <div class="cook-appicon__details">\n                <h4 class="cook-appicon__title">{{ label }}</h4>\n                <cjmd-iconbutton :link="link" v-if="link" icon-name="open_in_new" dark></cjmd-iconbutton>\n              </div>\n            </div>'
}), Vue.component("cook-collection", {
	props: {
		secret: {
			type: Boolean
		}
	},
	computed: {
		displayedItems: function() {
			return this.secret ? this.iconCollection.slice().reverse() : this.iconCollection.filter(function(e) {
				return !e.secret
			}).reverse()
		},
		topAmount: function() {
			return 4 * Math.round(window.innerHeight / 300)
		},
		topItems: function() {
			for (var e = [], o = 0; o < this.topAmount; o++) e.push(this.displayedItems[o]);
			return e
		},
		otherItems: function() {
			for (var e = [], o = this.topAmount; o < this.displayedItems.length; o++) e.push(this.displayedItems[o]);
			return e
		}
	},
	created: function() {
		var e = this.topItems.map(function(i) {
				return new Promise(function(e) {
					var o = new window.Image;

					function a() {
						o.remove(), e()
					}
					o.src = "images/app-icons/" + i.id + ".png", o.srcset = "images/app-icons/" + i.id + "@2x.png 2x", o.addEventListener(
						"load", a), o.addEventListener("error", a), document.body.appendChild(o)
				})
			}),
			o = this;

		function a() {
			o.topItemsLoaded = !0
		}
		Promise.all(e).then(a), setTimeout(a, 5e3)
	},
	data: function() {
		return {
			topItemsLoaded: !1,
			iconCollection: [{
				name: "更多",
			    id: "logo",
				url: "#"
			}, {
				name: "未来UI",
				id: "未来UI",
				url: "https://www.coolapk.com/apk/232387"
			}, {
				name: "终端",
				id: "终端",
				url: "https://www.coolapk.com/apk/232382"
			}, {
				name: "未来主义",
				id: "未来主义",
				url: "https://www.coolapk.com/apk/232367"
			}, {
				name: "科幻",
				id: "科幻",
				url: "https://www.coolapk.com/apk/232375"
			}, {
				name: "科技",
				id: "科技",
				url: "https://www.coolapk.com/apk/232378"
			}, {
				name: "科技感",
				id: "科技感",
				url: "https://www.coolapk.com/apk/232361"
			}, {
				name: "黑客",
				id: "黑客",
				url: "https://www.coolapk.com/apk/232371"
			}, {
				name: "极客",
				id: "极客",
				url: "https://www.coolapk.com/apk/232309"
			}, {
				name: "未来",
				id: "未来",
				url: "https://www.coolapk.com/apk/249917"
			}, {
				name: "ARC",
				id: "ARC",
				url: "https://www.coolapk.com/apk/237108"
			}, {
				name: "Agent",
				id: "Agent",
				url: "https://www.coolapk.com/apk/237107"
			}, {
				name: "Scitific",
				id: "Scitific",
				url: "https://www.coolapk.com/apk/237109"
			}, {
				name: "Dashboard",
				id: "Dashboard",
				url: "https://www.coolapk.com/apk/249916"
			}, {
				name: "Trek",
				id: "Trek",
				url: "https://www.coolapk.com/apk/249918"
			}, {
				name: "骇客",
				id: "骇客",
				url: "https://www.coolapk.com/apk/252024"
			}, {
				name: "Aris-终端桌面",
				id: "Aris",
				url: "https://www.coolapk.com/apk/shinado.indi.piping"	
			}]
		}
	},
	template: '<div class="cook-collection" :class="{\'cook-collection--loaded\': topItemsLoaded}">\n              <cook-appicon v-for="(itemData, index) in topItems" animating :style="{animationDelay: index * 0.05 + \'s\'}" :icon-name="itemData.id" :key="itemData.id" :label="itemData.name" :link="itemData.url"></cook-appicon>\n              <cook-appicon v-for="itemData in otherItems" :icon-name="itemData.id" :key="itemData.id" :label="itemData.name" :link="itemData.url"></cook-appicon>\n            </div>'
});


import { getBanner, getHotSongs, getMvs } from "@/apis/index.js";
import bar from "../../components/bar.vue";
import songList from "../../components/songlist.vue";
import mvList from "../../components/mvlist.vue";
export default {
  data() {
    return {
      downOption: {
        auto: false, //是否在初始化后,自动执行下拉回调callback; 默认true
      },
      upOption: {
        use: false,
      },
      banners: [],
      songlist: [],
      mvlist: [],
      cuIconList: [
        {
          cuIcon: "hotfill",
          color: "red",
          badge: 0,
          name: "推荐",
        },
        {
          cuIcon: "musicfill",
          color: "orange",
          badge: 0,
          name: "列表",
        },
        {
          cuIcon: "rankfill",
          color: "yellow",
          badge: 0,
          name: "排行",
        },
        {
          cuIcon: "wefill",
          color: "olive",
          badge: 22,
          name: "电台",
        },
      ],
      gridCol: 4,
      gridBorder: false,
      isSearch: false,
    };
  },
  computed: {
    songlist1() {
      return this.songlist.slice(0, 6);
    },
    songlist2() {
      return this.songlist.slice(6);
    },
  },
  components: {
    // mainnavbar
    bar,
    songList,
    mvList,
  },
  onLoad() {
    this.getBanners();
    this.getHotSongs();
    this.getMvs();
  },
  methods: {
    downCallback(mescroll) {
      this.timeout = setTimeout(() => {
        mescroll.resetUpScroll();
        mescroll.endErr();
        uni.showToast({
          icon: "success",
          title: "",
          duration: 1500,
        });
      }, 1000);
    },
    barEvent(param) {
      if (param == "searching") {
        this.isSearch = true;
      }
      if (param == "searched") {
        this.isSearch = false;
      }
    },
    getBanners() {
      getBanner().then((res) => {
        // this.banners = res.banners.reverse();
        this.banners = res.banners;
      });
    },
    getHotSongs() {
      getHotSongs({
        limit: 16,
      }).then((res) => {
        this.songlist = res.playlists;
      });
    },
    getMvs() {
      getMvs({ limit: 4 }).then((res) => {
        this.mvlist = res.data;
      });
    },
    toMusic(ele) {
      if (ele.type == 1000) {
        uni.navigateTo({
          animationDuration: 500,
          animationType: "pop-in",
          url: "/pages/index/musicalbum?id=" + ele.id,
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "此功能暂未开发，敬请期待!",
          duration: 1500,
        });
      }
    },
    cuClick() {
      uni.showToast({
        icon: "none",
        title: "此功能暂未开发，敬请期待!",
        duration: 1500,
      });
    },
  },
};

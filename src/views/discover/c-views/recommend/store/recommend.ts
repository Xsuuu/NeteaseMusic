import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArtistlist,
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from '../service/recommend'
import recommend from '..'
import { promises } from 'dns'

// export const fetchBannerDataAction = createAsyncThunk('banners', (arg, { getState }) => {
export const fetchRecommendDataAction = createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    //1.获取轮播图数据
    getBanners().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendAction(res.result))
    })
    getNewAlbum().then((res) => {
      dispatch(changeNewAlbumAction(res.albums))
    })
    getArtistlist(5).then((res) => {
      dispatch(changeSettleSingersAction(res.artists))
    })
    //这里不要用await async，因为await要等到一个执行完了才执行下一个
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    // for (const id of rankingIds) {
    //每一个请求单独处理
    // getPlaylistDetail(id).then((res) => {
    //   switch (id) {
    //     case 19723756:
    //       console.log('飙升榜', res)
    //       break
    //     case 3779629:
    //       console.log('新歌榜', res)
    //       break
    //     case 2884035:
    //       console.log('原创榜', res)
    //       break
    //   }
    // })
    // }

    //将三个结果都拿到，放到一个数组中统一管理
    //保障：1.获取到所有的结果后再进行dispatch操作，2.获取到的结果要有正确的顺序
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }
    Promise.all(promises).then((res) => {
      const playlists = res
        ?.filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(changeRankingAction(playlists))
    })
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  settleSingers: any[]

  // upRanking: any
  // newRanking: any
  // originRanking: any
  //对象类型
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  // upRanking: {},
  // newRanking: {},
  // originRanking: {}
  settleSingers: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingersAction(state, { payload }) {
      state.settleSingers = payload
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(
  //       fetchBannerDataAction.fulfilled,
  //       (state: { banners: any }, { payload }: any) => {
  //         state.banners = payload
  //       }
  //     )
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingAction,
  changeSettleSingersAction
} = recommendSlice.actions

export default recommendSlice.reducer

// let BASE_URL = ''
// export const BASE_URL = 'https://zm.wwoyun.cn/'
// export const BASE_URL = 'https://nmusic.nxcloud.club:13140/'
// export const BASE_URL = 'https://ncm.zhenxin.me/'
// export const BASE_URL = 'https://music.mcseekeri.com/'
export const BASE_URL = 'https://ncme.zhenxin.me/'

export const TIME_OUT = 20000

//在react中如何区分开发环境和生产环境地址
//1.手动切换(手动注释，危险)
//2. 依赖于当前的环境：development/production
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'https://ncme.zhenxin.me/'
//   console.log('development')
// } else {
//   BASE_URL = 'https://ncme.zhenxin.me/'
//   console.log('production')
// }

// export { BASE_URL }
//3.创建.env.development和.env.production

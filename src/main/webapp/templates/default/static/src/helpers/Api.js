/**
 * Created by m2mbob on 2017/4/14.
 */
export const baseUrl = "http://localhost:8080";
export const apiHost = `${baseUrl}/api`;

export default {
    login: '/auth/login',
    articleById: (id) => `/article/${id}.json`,
    articleByCategoryName: (name, page) => `/category/${name}/article.json?page=${page}`,
}

import Cookies from 'js-cookie';

export function getAuthorizationHeader() {
    const currentUser = Cookies.get("currentUser");
    return {
        Authorization: `Bearer ${JSON.parse(currentUser || "")?.accessToken || ""}`,
    };
}

export function getJwt() {
    const currentUser = Cookies.get("currentUser");
    return `${JSON.parse(currentUser || "")?.accessToken || ""}`;
}

export function setJwt(token: string) {
    const currentUser = JSON.parse(Cookies.get("currentUser") || "{}");
    currentUser.accessToken = token;
    Cookies.set("currentUser", JSON.stringify(currentUser));
}

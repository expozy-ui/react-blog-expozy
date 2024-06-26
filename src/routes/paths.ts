// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_PAGE = "/";

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  root: ROOTS_PAGE,
  auth: {
    login: path(ROOTS_PAGE, "auth/login"),
    register: path(ROOTS_PAGE, "auth/register"),
    forgetPassword: path(ROOTS_PAGE, "auth/forget-password"),
    resetPassword: path(ROOTS_PAGE, "auth/reset-password"),
  },
  blog: {
    slug: path(ROOTS_PAGE, 'blog/:slug')
  }
};

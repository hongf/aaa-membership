//Have some css in app.css applied to all, such as external link has go external icon as suffix
// ul li, have margin left...
export const globals = {
  html: {
    scrollBehavior: 'smooth',
  },
  ':root': {
    boxSizing: 'border-box',
  },
  '*, *::before, *::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'inherit',
  },
  '* input, .MuiInputBase-root': {
    background: 'white',
  },
  body: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  li: { marginBottom: '4px' },
};

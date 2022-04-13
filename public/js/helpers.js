const applyTheme = () => {
  var node = document.getElementById('main_page')
  if (localStorage.getItem('myDarkMode') === 'true') node.setAttribute('data-theme', 'black')
  else node.setAttribute('data-theme', 'lofi')
}

const applyPageDirection = () => {
  let s = localStorage.getItem('language')
  if (!s) {
    localStorage.setItem('language', 'en')
    s = localStorage.getItem('language')
  }
  var node = document.getElementById('main_page')
  if (s === 'ar') {
    node.setAttribute('dir', 'rtl')
  } else {
    node.setAttribute('dir', 'ltr')
  }
}

applyTheme()
applyPageDirection()

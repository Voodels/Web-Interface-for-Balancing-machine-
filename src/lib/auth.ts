export function setAuthenticated(value: boolean) {
    localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
  }
  
  export function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
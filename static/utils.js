export const formatString = str => {
    str = str.replace(/[-_]/g, ' ');
  
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
}

var MYLIBRARY = MYLIBRARY || (function(){
  return {
    getCdnUrl: function (id, key) {
      const imageRequest = JSON.stringify({
        bucket: 'cf-simple-s3-origin-cloudfrontfors3-273116933489',
        key,
      });
      document.getElementById(id).src = `https://d1kk667yopfgms.cloudfront.net/${btoa(imageRequest)}`;
    }
  }
}());

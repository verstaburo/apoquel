/* eslint-disable */
const $ = window.$;
const globalOptions = window.globalOptions;

export default function windowResize() {
  const breakpoints = [globalOptions.sizes.sm, 480, 768];
  const breakpointsName = ['mobile', 'mobileBig', 'tablet', 'desktop'];

  function checkbp() {
    let ww = $(window).width();
    let returnVal = breakpointsName[0];

    for (var i = 0; i < breakpoints.length; i++) {
      if (ww >= breakpoints[i]) returnVal = breakpointsName[i+1];
    }

    return returnVal;
  }

  let breakpointLoaded = checkbp();
  let breakpointCurrent = checkbp();

  function metaTag () {
    let wWidth = 768;

    if (breakpointCurrent === 'mobile') wWidth = 320;
    if (breakpointCurrent === 'mobileBig') wWidth = 480;

    $(document).find('[name="viewport"]').attr('content', `width=${wWidth}`);
  }

  metaTag();

  $(window).resize(function () {
    breakpointCurrent = checkbp();
    if (breakpointLoaded != breakpointCurrent) location.reload();
  });
}
/* eslint-enable */

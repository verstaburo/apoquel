/* eslint-disable */
const $ = window.$;
const globalOptions = window.globalOptions;

export default function windowResize() {
  const breakpoints = [globalOptions.sizes.sm, 480, globalOptions.sizes.lg];
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
  let breakpointCurrent;
  let metaTag;

  if (breakpointLoaded === 'mobile') {
    $(document).find('[name="viewport"]').attr('content', 'width=320');
  }

  if (breakpointLoaded === 'mobileBig') {
    $(document).find('[name="viewport"]').attr('content', 'width=480');
  }

  $(window).resize(function () {
    breakpointCurrent = checkbp();
    if (breakpointLoaded != breakpointCurrent) location.reload();
  });
}
/* eslint-enable */

import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import windowResize from '../blocks/js-functions/window';
import parallax from '../blocks/js-functions/parallax';
import { freezebuttons } from '../blocks/js-functions/freeze';
import popups from '../blocks/popups/popups';
import slider from '../blocks/slider/slider';
import tabs from '../blocks/tabs/tabs';
import header from '../components/header/header';
import products from '../components/products/products';
import videoBlock from '../components/video-block/video-block';
import mytest from '../blocks/test/test';
import accordeon from '../blocks/accordeon/accordeon';
import share from '../blocks/share/share';
import faq from '../pages/faq/faq';

const $ = window.$;

$(() => {
  svg4everybody();
  objectFitImages();
  freezebuttons();
  popups();
  slider();
  tabs();
  header();
  videoBlock();
  windowResize();
  products();
  mytest();
  parallax();
  accordeon();
  share();
  faq();
});

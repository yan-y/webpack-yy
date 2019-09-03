import _ from 'lodash';
import $ from 'jquery';

const dom = $('<div>');
dom.html(_.join(['yan', 'yu'], '--'));
$('body').append(dom);
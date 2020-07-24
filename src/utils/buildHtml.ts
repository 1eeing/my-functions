/*
 * @Author: leeing
 * @Date: 2018-07-30 15:39:30
 * @Last Modified by: Leeing
 * @Last Modified time: 2018-11-19 15:02:31
 */

//@ts-nocheck
(function($) {
  const $el = $('body');
  const BASE_DOMAIN = '';
  const TOKEN = ''; //其实没用，不过还是加上
  const PAGE = getPage();
  const API_LIST = {
      //上传文件
      'static_save': '/index/save',
      //删除文件
      'static_delete': '/index/del',
      //获取文件列表
      'get_static_list': '/index/get',
      //获取文件详情
      'get_info': '/index/getFileContent'
  };

  let startX, startY, endX, endY, radius, bgWidth, bgHeight;

  function getPage(path = location.pathname) {
      let a = path.split('.html')[0];
      let b = a.split('/');
      b = b[b.length - 1];
      return b;
  };

  function getQueryParam(key) {
      let reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
      let r = location.search.substr(1).match(reg);
      if(r != null) {
          return unescape(r[2]);
      }
      return null;
  };

  function request(options) {
      if(!options.url || !API_LIST[options.url]) {
          alert('请传入url');
          return;
      }

      let defaultOptions = {
          method: 'POST',
          body: {}
      };
      let obj = Object.assign({}, defaultOptions, options);
      let params = obj.body;
      params.token = TOKEN;
      let form = new FormData();
      for(let key in params) {
          form.append(key, params[key]);
      }
      obj.body = form;

      return new Promise((resolve, reject) => {
          fetch(BASE_DOMAIN + API_LIST[options.url], obj).then(res => {
              if(res.status == 200) {
                  return res.json();
              } else {
                  alert('请求失败！');
                  return;
              }
          }).then(json => {
              resolve(json);
          }).catch(err => {
              reject(err);
          });
      });
  };

  function init() {
      let err = checkParams();
      if(err){
          alert(err);
          return;
      }
      try {
          let code = buildHtml();
          $el.find('[name="content"]').val(code);
          alert('生成成功！');
      } catch (error) {
          console.log(error);
          alert('生成失败');
      }
  };

  function checkParams() {
      if(!getInputValue('contentImg')){
          return '请先上传图片！';
      }

      let errTxt;
      $el.find('.oneBtn').each(function() {
          let target = $(this);
          let shape = target.find('select[name="shape"]').val();
          if(!target.find('input[name="startX"]').val()){
              errTxt = '请输入startX';
          }
          if(!target.find('input[name="startY"]').val()){
              errTxt = '请输入startY';
          }
          if(shape == '0'){
              if(!target.find('input[name="endX"]').val()){
                  errTxt = '请输入endX';
              }
              if(!target.find('input[name="endY"]').val()){
                  errTxt = '请输入endY';
              }
          }else if(shape == '1'){
              if(!target.find('input[name="radius"]').val()){
                  errTxt = '请输入radius';
              }
          }
      });
      if(errTxt){
          return errTxt;
      }
  };

  function buildEnterPoint() {
      let enterFm = getInputValue('enterFm'),
          enterPoint = getInputValue('enterPoint');

      if(enterFm && enterPoint){
          return (
          `
          _directPub({
              _fm: '${enterFm}',
              point: '${enterPoint}'
          })
          `
          );
      }

      return '';
  };

  function buildButton() {
      let btnHtm = [],
          btnJs = [],
          btnCss = [];

      $el.find('.oneBtn').each((idx, item) => {
          let target = $(item),
              id = `oneBtn_${idx}`,
              btnBlank = target.find('select[name="btnBlank"]').val(),
              btnUrl = target.find('input[name="btnUrl"]').val(),
              shape = target.find('select[name="shape"]').val(),
              sx, sy, ex, ey, r,
              btnFm, btnPoint;

          let blankHtm = btnBlank == '1' ? '' : `target="_blank"`;
          let aHtm = btnUrl ? `href="${btnUrl}" ${blankHtm}` : 'href="javascript:;"';
          let position, borderRadiusHtm = '';

          sx = parseFloat(target.find('input[name="startX"]').val());
          sy = parseFloat(target.find('input[name="startY"]').val());
          if(shape == '0'){
              ex = parseFloat(target.find('input[name="endX"]').val());
              ey = parseFloat(target.find('input[name="endY"]').val());
              position = calculatePosition({sx, sy, ex, ey, shape});
          }else if(shape == '1'){
              r = parseFloat(target.find('input[name="radius"]').val());
              position = calculatePosition({sx, sy, r, shape});
              borderRadiusHtm = `border-radius: 50%;`;
          }
          btnCss.push(
              `
              #${id}{
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: ${-position.offsetY}px;
                  margin-left: ${position.offsetX}px;
                  width: ${position.width}px;
                  height: ${position.height}px;
                  ${borderRadiusHtm}
              }
              `
          );

          btnFm = target.find('input[name="btnFm"]').val();
          btnPoint = target.find('input[name="btnPoint"]').val();
          if(btnFm && btnPoint){
              btnJs.push(
                  `
                  $('#${id}').on('click', function(){
                      _directPub({
                          _fm: '${btnFm}',
                          point: '${btnPoint}'
                      });
                  });
                  `
              );
          }

          btnHtm.push(`<a id="${id}" ${aHtm}></a>`);
      });

      btnHtm = btnHtm.join('');
      btnJs = btnJs.join('');
      btnCss = btnCss.join('');

      return {
          btnHtm,
          btnJs,
          btnCss
      }
  }

  function buildBg() {
      let buttons = buildButton();
      let picUrl = getInputValue('contentImg');
      let bgHtm = `<div class="bg">${buttons.btnHtm}</div>`;
      let bgCss =
      `
      .bg{
          background: url(${picUrl}) no-repeat center center;
          width: 100%;
          height: ${bgHeight}px;
          position: relative;
      }
      `;

      return {
          bgHtm,
          bgCss
      };
  }

  function buildHtml() {
      let title = getInputValue('title') || '宣传页',
          bg = buildBg(),
          enterPoint = buildEnterPoint(),
          buttons = buildButton();

      return (
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
              *{
                  margin: 0;
                  padding: 0;
              }
              ${bg.bgCss}
              ${buttons.btnCss}
          </style>
      </head>
      <body>
          ${bg.bgHtm}
          <script src="https://g.alicdn.com/sj/lib/jquery.min.js"></script>
          <script>
              (function() {
                  var taobaoNick = + new Date();
                  var _directPub = function(params) {

                          var $body = $('body'),
                              $img = $('<img style="position:fixed;bottom:0;left:-100px;width:0;height:0;"/>'),
                              keyMap = {
                                  app_type: 'url_tj',
                                  log_type: 'click',
                                  taobaoNick: taobaoNick,
                                  point: '',
                                  _fm: ''
                              };

                          var queryStr;

                          params.rad = Math.random();
                          queryStr = $.param($.extend({}, keyMap, params));
                          $img.attr('src', 'https://ftj.superboss.cc/tj.jpg?' + queryStr);
                          $body.append($img);
                          setTimeout(function(){
                              $img && $img.remove();
                          },1000)
                  };

                  ${enterPoint}
                  ${buttons.btnJs}
              })();
          </script>
      </body>
      </html>
      `
      );
  };

  function addBtn() {
      let picUrl = getInputValue('contentImg');
      if(!picUrl){
          alert('请先上传图片！');
          return;
      }
      let oneButton =
          $(`<div class="oneBtn">
          <div class="mb10">
              <label>按钮形状：</label>
              <select name="shape">
                  <option selected value="0">矩形</option>
                  <option value="1">圆形</option>
              </select>
          </div>
          <div class="mb10">
              <label>链接打开方式：</label>
              <select name="btnBlank">
                  <option selected value="0">新页面打开</option>
                  <option value="1">当前页面打开</option>
              </select>
          </div>
          <div class="mb10">
              <label>按钮链接：</label>
              <input type="text" class="w300" name="btnUrl" placeholder="链接地址，如https://www.baidu.com">
          </div>
          <div class="mb10">
              <label>位置信息：</label>
              <input type="text" name="startX" placeholder="startX" />
              <input type="text" name="startY" placeholder="startY" />
              <input type="text" name="endX" placeholder="endX" />
              <input type="text" name="endY" placeholder="endY" />
              <input type="text" class="hide" name="radius" placeholder="radius" />
              <span class="intercepting hide">正在截取中…</span>
              <button class="btn btn-info btn-sm intercept">截取坐标</button>
              <button class="btn btn-info btn-sm cancelIntercept hide">确定</button>
          </div>
          <div class="mb10">
              <label>打点信息：</label>
              <input type="text" name="btnFm" placeholder="属性标识" />
              <input type="text" name="btnPoint" placeholder="坐标" />
          </div>
          <div>
              <button class="btn btn-danger btn-sm deleteBtn">删除按钮</button>
          </div>
      </div>`);

      $el.find('.btns').append(oneButton);
  };

  function deleteBtn($t) {
      let $delete = $t.closest('.oneBtn');
      if($delete.hasClass('.ing')){
          bindCanvas(false);
      }
      $delete.remove();
  };

  function getInputValue(name, type = 'input') {
      let chose = type == 'input' ? '' : ':checked';
      return $el.find(`${chose}[name="${name}"]`).val();
  };

  function getCanvas(isJq = false) {
      let c = $el.find('.previewMain');
      return isJq ? c : c[0];
  };

  function getCtx() {
      let c = getCanvas();
      let ctx = c.getContext('2d');
      return ctx;
  }

  function createImg(picUrl, cb) {
      let img = new Image();
      img.src = picUrl;
      img.onload = () => {
          cb && cb(img);
      }
  }

  function drawImg() {
      let ctx = getCtx();
      let picUrl = getInputValue('contentImg');
      if(!picUrl){
          return;
      }
      createImg(picUrl, img => {
          let c = getCanvas(true),
              width = img.width,
              height = img.height;

          bgWidth = width;
          bgHeight = height;
          c.attr({'width': width, 'height': height});
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
      });
  };

  function draw() {
      let picUrl = getInputValue('contentImg');
      if(!picUrl){
          alert('请先上传图片！');
          return;
      }
      let shape = $el.find('.oneBtn.ing').find('select[name=shape]').val();
      switch (shape) {
          case '0':
              drawRect();
              break;
          case '1':
              drawCircle();
              break;
      }
  };

  function drawRect() {
      let ctx = getCtx();
      let w = Math.abs(startX - endX),
          h = Math.abs(startY - endY);
      ctx.beginPath();
      ctx.strokeRect(startX, startY, w, h);
      ctx.fillText(`（${startX},${startY}）`, startX, startY);
      ctx.fillText(`（${endX},${endY}）`, endX, endY);
      fillText('rect');
  };

  function drawCircle() {
      let ctx = getCtx();
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillText(`（${startX}，${startY}，${radius}）`, startX - radius, startY);
      fillText('arc');
  };

  function fillText(type = 'rect') {
      let $content = $el.find('.oneBtn.ing');
      switch (type) {
          case 'rect':
              $content.find('input[name="startX"]').val(startX);
              $content.find('input[name="startY"]').val(startY);
              $content.find('input[name="endX"]').val(endX);
              $content.find('input[name="endY"]').val(endY);
              break;
          case 'arc':
              $content.find('input[name="startX"]').val(startX);
              $content.find('input[name="startY"]').val(startY);
              $content.find('input[name="radius"]').val(radius);
              break;
      }
  };

  function interceptArea($t, isCut) {
      let $parent = $t.closest('.oneBtn');
      isCut && $parent.siblings('.oneBtn.ing').each(function() {
          showIntercepting($(this), !isCut);
      });
      showIntercepting($parent, isCut);
  };

  function showIntercepting($con, isCut) {
      $con[!isCut ? 'removeClass' : 'addClass']('ing');
      $con.find('.intercepting')[isCut ? 'removeClass' : 'addClass']('hide');
      $con.find('.cancelIntercept')[isCut ? 'removeClass' : 'addClass']('hide');
      $con.find('.intercept')[!isCut ? 'removeClass' : 'addClass']('hide');
      bindCanvas(isCut);
  };

  function changeShape($p, isRect = true) {
      $p.find('input[name="endX"]')[isRect ? 'removeClass' : 'addClass']('hide');
      $p.find('input[name="endY"]')[isRect ? 'removeClass' : 'addClass']('hide');
      $p.find('input[name="radius"]')[!isRect ? 'removeClass' : 'addClass']('hide');
  };

  function calculateRadius(sx, sy, ex, ey) {
      let x = Math.abs(sx - ex),
          y = Math.abs(sy - ey);

      return parseFloat(Math.sqrt(x*x + y*y).toFixed(2));
  };

  function calculatePosition(options) {
      //建立一个以中点为原点的坐标轴
      let mx = bgWidth / 2,
          my = bgHeight / 2;

      let offsetX, offsetY, width, height, offset;

      if(options.shape == '0'){
          offset = calculateOffset(options.sx, options.sy, mx, my);
          offsetX = offset.offsetX;
          offsetY = offset.offsetY;
          width = Math.abs(options.ex - options.sx);
          height = Math.abs(options.ey - options.sy);
      }else if(options.shape == '1'){
          let leftX = options.sx - options.r,
              leftY = options.sy - options.r;

          offset = calculateOffset(leftX, leftY, mx, my);
          offsetX = offset.offsetX;
          offsetY = offset.offsetY;
          height = width = 2 * options.r;
      }

      return {offsetX, offsetY, width, height};
  };

  function calculateOffset(sx, sy, mx, my) {
      return {
          offsetX: sx - mx,
          offsetY: my - sy
      };
  };

  function previewHTML() {
      let code = getInputValue('content');
      if(!code){
          return;
      }
      let newWindow = window.open();
      newWindow.document.write(code);
  };

  function copy() {
      let code = getInputValue('content');
      if(!code){
          return;
      }
      $el.find('[name="content"]').select();
      document.execCommand('Copy');
      alert('复制成功！');
  };

  function bindCanvas(isBind = true) {
      if(isBind){
          $el.find('.previewMain').on('mousedown', e => {
              startX = e.offsetX,
              startY = e.offsetY;
          }).on('mouseup', e => {
              endX = e.offsetX,
              endY = e.offsetY;
              radius = calculateRadius(startX, startY, endX, endY);
              draw();
          });
      }else{
          $el.find('.previewMain').off('mousedown').off('mouseup');
      }
  };

  function uploadServer() {
      let id = getQueryParam('id');
      if(!id || id == 'undefined') {
          id = '';
      }
      request({
          url: 'static_save',
          body: {
              id: id,
              content: getInputValue('content'),
              title: getInputValue('title') || `宣传页 ${new Date().toLocaleString()}`
          }
      }).then(json => {
          if(json.result == 100) {
              alert(`上传至服务器成功！访问地址：${json.data.fileUrl}`);
          } else {
              alert(json.message);
          }
      }).catch(error => {
          alert(error);
      });
  };

  function deleteContent(id) {
      if(!id){
          return;
      }
      let result = confirm('确定要删除此张静态页吗？');
      if(result) {
          request({
              url: 'static_delete',
              body: {
                  id: id
              }
          }).then(json => {
              $el.find(`tr[data-id="${id}"]`).remove();
              alert('删除成功！');
          }).catch(err => {
              alert(err);
          });
      }
  };

  function renderList() {
      request({
          url: 'get_static_list',
      }).then(json => {
          let data = json.data;
          let list = data.operationFiles && data.operationFiles.length ? data.operationFiles.map((item, idx) => {
              return (
                  `<tr data-id=${item.id}>
                      <td>${idx + 1}</td>
                      <td>${item.title}</td>
                      <td>${item.url}</td>
                      <td>
                          <a href="index.html?id=${item.id}" target="_blank" class="btn btn-warning editContent">重新编辑</a>
                          <a href="javascript:;" class="btn btn-danger ml10 deleteContent">删除</a>
                      </td>
                  </tr>`
              );
          }) : `<tr><td class="tCenter" colspan="4">暂无数据！</td></tr>`;
          $el.find('tbody').html(list);
      }).catch(err => {
          alert(err);
      });
  };

  function renderDetail() {
      let id = getQueryParam('id');
      if(!id || id == 'undefined'){
          return;
      }
      request({
          url: 'get_info',
          body: {
              id: id
          }
      }).then(json => {
          let data = json.data;
          $el.find('[name="content"]').val(data.content);
      }).catch(err => {
          alert(err);
      });
  }

  function bindEvents() {
      $el.on('click', (e) => {
          let $t = $(e.target);
          if($t.hasClass('ok')){
              init();
          }
          else if($t.hasClass('addBtn')){
              addBtn();
          }
          else if($t.hasClass('deleteBtn')){
              deleteBtn($t);
          }
          else if($t.hasClass('upload')){
              drawImg();
          }
          else if($t.hasClass('intercept')){
              interceptArea($t, true);
          }
          else if($t.hasClass('cancelIntercept')){
              interceptArea($t, false);
          }
          else if($t.hasClass('preview')){
              previewHTML();
          }
          else if($t.hasClass('copy')){
              copy();
          }
          else if($t.hasClass('uploadServer')) {
              uploadServer();
          }
          else if($t.hasClass('deleteContent')) {
              deleteContent($t.closest('tr').data('id'));
          }
      });

      $el.on('change', 'select[name="shape"]', e => {
          let $this = $(e.target),
              $parent = $this.closest('.oneBtn');
          if($this.val() == '0'){
              changeShape($parent, true);
          }else{
              changeShape($parent, false);
          }
      });
  };

  bindEvents();
  if(PAGE == 'index') {
      renderDetail();
  }else if(PAGE == 'list') {
      renderList();
  }



})(window.jQuery);

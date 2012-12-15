var args = arguments[0] || {};

// パラメータのデフォルト値
_.defaults(args, {
  'alphaBlack': 0.5,
  'alphaWhite': 0.5,
  'gradientEnabled': true,
  'gradientPosition': 0.25
});

// アルファチャンネル値を計算
var b = ('0' + (~~(255 * args.alphaBlack)).toString(16)).slice(-2);
var w = ('0' + (~~(255 * args.alphaWhite)).toString(16)).slice(-2);

if (args.gradientEnabled) {
  // グラデーションありの場合
  var gradientParams = {
    type: 'linear',
    startPoint: {x: 0, y: 0},
    endPoint: {x: '100%', y: 0}
  };
  $.black.setBackgroundGradient(_.extend(gradientParams, {
    colors: [
      {color: '#0000', offset: 0},
      {color: '#' + b + '000000', offset: args.gradientPosition},
      {color: '#' + b + '000000', offset: (1 - args.gradientPosition)},
      {color: '#0000', offset: 1}
    ]
  }));
  $.white.setBackgroundGradient(_.extend(gradientParams, {
    colors: [
      {color: '#0fff', offset: 0},
      {color: '#' + w + 'ffffff', offset: args.gradientPosition},
      {color: '#' + w + 'ffffff', offset: (1 - args.gradientPosition)},
      {color: '#0fff', offset: 1}
    ]
  }));
} else {
  // グラデーションなしの場合
  $.black.setBackgroundColor('#' + b + '000000');
  $.white.setBackgroundColor('#' + w + 'ffffff');
}

_.each(args, function(value, key) {
  switch (key) {
    case 'id':
    case 'alphaBlack':
    case 'alphaWhite':
    case 'gradientEnabled':
    case 'gradientPosition':
      // 処理済みのパラメータは無視
      break;
    case 'top':
    case 'left':
    case 'right':
    case 'bottom':
    case 'width':
      // 座標指定関連のパラメータのみコンテナに渡す
      $.container[key] = value;
      break;
    default:
      // それ以外のパラメータならエラーを吐く
      Ti.API.info('[ZuruiLine] parameter "' + key + '" is ignored.');
      break;
  }
});

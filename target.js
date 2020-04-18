let targets = {};

function TransformData(data) {
  let arr = [];
  for (let [key, value] of Object.entries(data)) {
    arr.push(value);
  }
  return arr;
};

function GetIdx(col, row) {
  return `${col}x${row}`; 
}

const PRINT_DIV = '#target-print';

const builder = new TargetBuilder(PRINT_DIV);
d3.select('#bg_color').on('input', function() {
  d3.select(PRINT_DIV).style('background-color', this.value);
});

d3.select('#target-add').on('click', function() {
  const size = parseFloat(d3.select('#size').property('value'));
 
  const col = parseInt(d3.select('#col').property('value'));
  const row = parseInt(d3.select('#row').property('value'));
  
  const grid_color = d3.select('#grid_color').property('value');
  
  const c_color = d3.select('#c_color').property('value');
  const c_size = parseFloat(d3.select('#c_size').property('value'));
  
  const txt = d3.select('#txt').property('checked');
  
  const idx = GetIdx(col, row);
  
  if (idx in targets) {
    return;
  }

  targets[idx] = {
    idx: idx,
    size: size,
    color: grid_color,
    be: c_color,
    be_size: c_size,
    txt: txt,
    metric: true,
    row: row,
    col: col,
  }; 
  
  const p = d3.select('#target-list tbody');
  const tr =  p.selectAll('tr').data(TransformData(targets), (d) => d.idx).enter().append('tr');
  
  tr.append('td').text(function (d) {
    return d.col;
  });
  
  tr.append('td').text(function (d) {
    return d.row;
  });
  
  tr.append('td').text(function (d) {
    return d.size;
  });

  const del = tr.append('td').append('input').attr('type', 'button')
  del.attr('value', 'Delete').on('click', function(d, i) {
    tr.remove();
    delete targets[d.idx];
    builder.Draw(targets);
  });
  builder.Draw(targets);
});

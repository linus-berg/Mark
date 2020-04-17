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


const builder = new TargetBuilder('#target-print');

d3.select('#add-target').on('click', function() {
  const size = parseInt(d3.select('#size').node().value);
  const col = parseInt(d3.select('#column').node().value);
  const row = parseInt(d3.select('#row').node().value);
  const color = d3.select('#color').node().value;
  const idx = GetIdx(col, row);
  
  if (idx in targets) {
    return;
  }

  targets[idx] = {
    idx: idx,
    size: size,
    color: '#000000',
    be: color,
    be_size: 2,
    txt: false,
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

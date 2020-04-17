const CM = 96/2.54;
const INCH = 96;

class TargetBuilder {
  constructor() {
    this.wrap = d3.select('#wrapper');
  }
  
  Draw(targets) {
    const data = this.wrap.selectAll('svg').data(TransformData(targets), d => d.idx);
    const svgs = data.join('svg');
    
    svgs.style('grid-column', (d) => d.col)
        .style('grid-row', (d) => d.row)
        .attr('width', (d) => (d.size + 1) * CM * 2)
        .attr('height', (d) => (d.size + 1) * CM * 2);
    
    svgs.selectAll('g').remove(); 
    
    const targs = svgs.append('g');
    
    targs.attr('transform', function(d) {
      const p = d3.select(this.parentNode);
      return `translate(${p.attr('width') / 2}, ${p.attr('height') / 2})`
    });
    
    const metas = targs.append('g').attr('class', 'meta');
    const grids = targs.append('g').attr('class', 'grid');
    
    this.DrawMeta(metas)
    this.DrawGrid(grids);
  } 
  
  DrawGrid(grids) {
    grids.each(function(d) {
      const size = d.size * CM;
      const grid_color = d.color;
      const sel = d3.select(this);

      for (let i = d.size * 2; i >= 0; i--) {
        const size_i = i * CM;
        sel.append('line')
            .attr('x1', -size)
            .attr('x2', size)
            .attr('y1', -size + size_i)
            .attr('y2', -size + size_i)
            .attr('stroke', grid_color)
            .attr('stroke-width', 1);
        
        sel.append('line')
          .attr('x1', -size + size_i)
          .attr('x2', -size + size_i)
          .attr('y1', -size)
          .attr('y2', size)
          .attr('stroke', grid_color)
          .attr('stroke-width', 1);
      }
    });
  }

  DrawMeta(metas) {
    metas.each(function(d, ix) {
      const size = d.size * CM;
      const sel = d3.select(this);
      const text_color = 'black';

      for (let i = d.size; i >= 0 && d.txt; i--) {
        /* Box */
        sel.append('text')
          .attr('fill', text_color)
          .attr('font-family', 'IBM Plex Sans')
          .attr('font-size', '1.5rem')
          .attr('text-anchor', 'middle')
          .attr("dominant-baseline", "central")  
          .attr('x', (0.5 + d.size) * CM)
          .attr('y', -i * CM)
          .text(i);
        
        sel.append('text')
          .attr('fill', text_color)
          .attr('font-family', 'Arial')
          .attr('font-size', '1.5rem')
          .attr('text-anchor', 'middle')
          .attr("dominant-baseline", "central")  
          .attr('x', i * CM)
          .attr('y', (0.5 + d.size) * -CM)
          .text(i);
        
      }
      sel.append('rect')
        .attr('height', d.be_size * CM)
        .attr('width', d.be_size * CM)
        .attr('x', -CM * d.be_size / 2)
        .attr('y', -CM * d.be_size / 2)
        .attr('fill', d.be)
        .attr('fill-opacity', 1);
    });
  }
  
}

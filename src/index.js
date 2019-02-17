const STYLE = { fontStyle: 'italic' };

export default {
  renderMark(inProps, inEditor, inNext) {
    const { children, ...attributes } = inProps;
    switch (inProps.mark.type) {
      case 'italic':
        return (
          <span style={STYLE}>
            {children}
          </span>
        );
      default:
        return inNext();
    }
  }
};

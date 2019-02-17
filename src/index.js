export default {
  renderMark(inProps, inEditor, inNext) {
    const { children, ...attributes } = inProps;
    switch (inProps.mark.type) {
      case 'italic':
        return <i {...attributes}> {children}</i>;
      default:
        return inNext();
    }
  }
};

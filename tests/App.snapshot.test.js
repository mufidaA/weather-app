test('renders App component', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot({

    styles: expect.any(Object),
  });
});

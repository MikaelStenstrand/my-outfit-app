// shared style across components

export const sharedStyles = {
  floatingButton: {
    bottomRight: {
      position:'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      alignSelf:'flex-end'
    },
  },
  debug: {
    color: '#b2b2b2'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}
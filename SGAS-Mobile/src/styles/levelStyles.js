import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ACFDFD',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  levelButton: {
    width: width * 0.8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  ratioText: {
    fontSize: 14,
    color: '#B0D9E5',
    marginTop: 6,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backGradient: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

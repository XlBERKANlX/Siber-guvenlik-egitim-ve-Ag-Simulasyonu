import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  questionBox: {
    padding: 16,
    borderRadius: 15,
    marginBottom: 30,
  },
  innerQuestionBox: {
    backgroundColor: '#1900FF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    color: '#ACFDFD',
    fontStyle: 'italic',
  },
  optionButton: {
    borderWidth: 1.5,
    borderColor: '#ACFDFD',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#0735A9',
  },
  optionText: {
    color: '#ACFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtons: {
    marginTop: 20,
    gap: 10,
  },
  navButtonLeft: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    marginBottom: 12,
  },
  navButtonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    marginBottom: 12,
  },
  buttonInner: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finishButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
  },
  finishButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 3,
    textAlign: 'center',
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

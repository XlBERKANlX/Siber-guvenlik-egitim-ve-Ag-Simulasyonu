import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#B0D9E5',
    fontSize: 40,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0D9E5',
    borderRadius: 10,
    color: '#B0D9E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    borderWidth: 1,
    borderColor: '#B0D9E5',
    borderRadius: 10,
    color: '#B0D9E5',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#B0D9E5',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  registerButton: {
    borderTopRightRadius: 23,
    borderBottomLeftRadius: 23,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginRedirect: {
    textAlign: 'center',
    marginTop: 20,
    color: '#7EC5FF',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  
});

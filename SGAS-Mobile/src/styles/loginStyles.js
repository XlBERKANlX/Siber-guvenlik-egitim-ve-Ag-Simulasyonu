import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 4,
      },
      
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
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0D9E5',
    borderRadius: 10,
    color: '#B0D9E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 15,
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
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: '#B0D9E5',
  },
  forgot: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#7EC5FF',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 15,
  },
  loginButton: {
    borderTopRightRadius: 23,
    borderBottomLeftRadius: 23,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderTopLeftRadius: 23,
    borderBottomRightRadius: 23,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginRedirect: {
    textAlign: 'center',
    marginTop: 0,
    color: '#7EC5FF',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  
});

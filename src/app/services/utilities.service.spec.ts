import { UtilitiesService } from './utilities.service';

fdescribe('Utilities Service', () => {
  it('Debería crear una nueva recomendación', () => {
    const mockedData = '7r'
    const expectedResult = 'Se puede agregar'
    const result = UtilitiesService.addRecommendation(mockedData);
    expect(result).toEqual(expectedResult)
  });

  it('Debería modificar una recomendación', () => {
    const mockedData = '2r'
    const expectedResult = 'Esto se puede modificar'
    const result = UtilitiesService.modifiedRecommendation(mockedData);
    expect(result).toEqual(expectedResult)
  });

  it('Debería eliminar una recomendación', () => {
    const mockedData = '2r'
    const expectedResult = 'Esto está eliminado'
    const result = UtilitiesService.deleteRecommendation(mockedData);
    expect(result).toEqual(expectedResult)
  });

  it('Debería iniciar sesión con correo y contraseña', () => {
    const mockedData = {email: 'danielguachamin@gmail.com', password: '123456'}
    const expectedResult = 'Inicio sesion'
    const result = UtilitiesService.userLogged(mockedData);
    expect(result).toEqual(expectedResult)
  });
});

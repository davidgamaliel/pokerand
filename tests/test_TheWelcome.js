import axios from 'axios';
import { shallowMount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue';

describe('MyComponent', () => {
  it('should fetch a random Pokemon and set the data', async () => {
    const mockResponse = {
      data: {
        name: 'Pikachu',
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'https://example.com/pikachu.png',
            },
          },
        },
      },
    };

    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const wrapper = shallowMount(MyComponent);
    await wrapper.vm.getPokemon();

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('https://pokeapi.co/api/v2/pokemon/'));
    expect(wrapper.vm.pokemon).toBe('Pikachu');
    expect(wrapper.vm.imagePath).toBe('https://example.com/pikachu.png');
    expect(console.log).toHaveBeenCalledWith('generated Pikachu path > ', 'https://example.com/pikachu.png');
  });

  it('should handle error when fetching Pokemon', async () => {
    const mockError = new Error('Failed to fetch Pokemon');

    axios.get = jest.fn().mockRejectedValue(mockError);
    console.error = jest.fn();

    const wrapper = shallowMount(MyComponent);
    await wrapper.vm.getPokemon();

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('https://pokeapi.co/api/v2/pokemon/'));
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
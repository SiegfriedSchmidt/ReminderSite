from random import randint


def generate_code(length=6):
    return ''.join([str(randint(0, 9)) for _ in range(length)])

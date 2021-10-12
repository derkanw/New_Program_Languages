from pathlib import Path
import pandas


def main() -> None:
    path = Path("ETFs")
    column = "Close"
    frames_list = [pandas.read_csv(file, sep=',') for file in path.iterdir()]
    df = pandas.concat(frames_list, axis=0)
    print(f"Mean = {df[column].mean()}")


if __name__ == '__main__':
    main()

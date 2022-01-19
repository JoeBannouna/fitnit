import os

def get_size(start_path = './src'):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # skip if it is symbolic link
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return total_size

print(get_size(), 'bytes')
print(get_size() / 1000, 'kilobytes')
print(get_size() / 1000000, 'megabytes')
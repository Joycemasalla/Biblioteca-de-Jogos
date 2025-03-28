import React, { Component } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

interface SearchBarState {
  value: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  private debounceTimer: NodeJS.Timeout | null = null;

  state = {
    value: ''
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearch, debounceTime = 300 } = this.props;
    const value = event.target.value;
    
    this.setState({ value });

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      onSearch(value);
    }, debounceTime);
  };

  componentWillUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  render() {
    const { placeholder = 'Search...' } = this.props;
    const { value } = this.state;

    return (
      <SearchWrapper>
        <SearchIcon>
          <Search size={20} />
        </SearchIcon>
        <SearchInput
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
      </SearchWrapper>
    );
  }
}

export default SearchBar;